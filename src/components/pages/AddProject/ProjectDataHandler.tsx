import { ChangeEvent } from "react";
import { address } from "../../../backed.url";

type DataObject = {
    descriptions: string[],
    titles: string[]
  }
  
  let ArrayData: DataObject = {
    descriptions: [],
    titles: []
  }

  type FileWithPosition = {
    position: number;
    file: File;
  };
  let files : FileWithPosition[] = []
  
  let ProjectTitle = ""
  var coverImage : File;
  var re = /(?:\.([^.]+))?$/;

export function updateData(position: number, description: string, title: string): void {
    if (ArrayData.descriptions.length < position) {
      while (ArrayData.descriptions.length < position) {
        ArrayData.descriptions.push("");
        ArrayData.titles.push("");
      }
    }
    ArrayData.descriptions[position] = description;
    ArrayData.titles[position] = title;

    console.log(JSON.stringify(ArrayData))
  }

export function handleProjectTitleChange(event: ChangeEvent<HTMLInputElement>){
  ProjectTitle = event.target.value;
  console.log(ProjectTitle)
}

export const handleFileInputChange = (position: number, event: React.ChangeEvent<HTMLInputElement>): void => {
  const newFile = event.target.files?.[0];

  if (newFile) {
    const existingFile = files.find(f => f.position === position);

    if (existingFile) {
      const newFiles = files.map(f => f.position === position ? { position, file: newFile } : f);
      files = newFiles
    
    } else{
      const newFiles = [...files, { position, file: newFile }];
      files = newFiles
      console.log(files)
    }
  }
};
export function handleCoverImage(event: React.ChangeEvent<HTMLInputElement>){
  console.log(event.target.files![0].name)
  if(event.target.files){
    coverImage = event.target.files[0]
    console.log(coverImage.name)
  }
}

export async function uploadProject(userid: string, projectNumber: number){
  try{
  // console.log(typeof(userid) + '' + userid + '\n' + typeof(projectNumber) + '' + projectNumber)
  const requestData = {
    userid: userid,
    projectData: JSON.stringify(ArrayData),
    projectTitle: ProjectTitle
  }
  const response = await fetch(`http://${address}:3000/newProject`, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });
  const responseBody = await response.json
  console.log(responseBody)

  for(let i = 0; i < files.length; i++){
    const data = new FormData();
    const ext = re.exec(files[i].file.name)![1]
    const filename = `${userid}-2-${projectNumber + 1}-${i}.${ext}`
    data.append('file', files[i].file, filename)
    await fetch(`http://${address}:3000/upload`, {
      method: 'POST',
      body: data
    })
    console.log(files[i].file.name + ' uploaded as ' + filename)
  }  
  const data = new FormData()
  const filename = `${userid}-1-${projectNumber + 1}-0.${coverImage.name}`
  data.append('file', coverImage, filename)
  console.log(data)
  await fetch(`http://${address}:3000/upload`, {
    method: 'POST',
    body: data
    })
    return {status: "OK"}
  }
  catch(e){
    alert("Nem sikerült feltölteni")
  }
}

export async function getProjects(userid: number, compareToProjectId?: string){
  const projectsResponse = await fetch(`http://${address}:3000/getProjects`, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
})

const projectsResponseBody = await projectsResponse.json()
let projectsData = []
for(let i = 0; i < projectsResponseBody.length; i++){
    if(compareToProjectId && projectsResponseBody[i].projectId == userid){
        return (projectsResponseBody[i])
    }
    else if(projectsResponseBody[i].userId == userid){
        projectsData.push(projectsResponseBody[i])
    }
}
console.log(projectsData)
return projectsData;
}

export async function getProfileDetails(userid: number){
          const requestData = {
            'userid': userid
        };

        const response = await fetch(`http://${address}:3000/getProfileDetails`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const responseBody = await response.json();
        return responseBody
}

export async function updateProfileDetails(updateData: any){
  await fetch(`http://${address}:3000/updateProfileDetails`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
}

export async function getImages(userid: number, imageType: number){
  const response = await fetch(`http://${address}:3000/getImages`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  console.log(userid)
  const responseBody = await response.json()
  const images : any = []
  for(let i = 0; i < responseBody.length; i++){
    if(imageType == 2){
      if(responseBody[i].imageType == imageType && responseBody[i].project == userid){
        images.push(responseBody[i].imageUrl)
      }
    }
    if(responseBody[i].imageType == imageType && responseBody[i].id == userid){
      images.push(responseBody[i].imageUrl)
    }
  }
  console.log(images)
  return await images

}
