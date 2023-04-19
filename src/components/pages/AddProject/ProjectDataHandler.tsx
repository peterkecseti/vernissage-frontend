import { ChangeEvent } from "react";

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

// export async function getName(userid: string){
//     const requestData = {
//         'userid': userid
//     };

//     const response = await fetch('http://localhost:3000/getProfileDetails', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(requestData)
//     });
//     const responseBody = await response.json();
//     console.log(responseBody)
//   }

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
