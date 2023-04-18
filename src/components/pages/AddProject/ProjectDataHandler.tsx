type DataObject = {
    descriptions: string[],
    titles: string[]
  }
  
  let ArrayData: DataObject = {
    descriptions: [],
    titles: []
  }
  
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