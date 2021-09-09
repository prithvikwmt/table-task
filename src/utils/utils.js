export const dateFormat = (date) => {
    const newDate = date.split(' - ')[0]
    const day = new Date(newDate).getDate().toString().length === 1 ? `0${new Date(newDate).getDate()}` : new Date(newDate).getDate()
    const month = (new Date(newDate).getMonth()+1).toString().length === 1 ? `0${(new Date(newDate).getMonth()+1)}` : new Date(newDate).getMonth()+1
    const year = new Date(newDate).getFullYear()
    return `${year}-${month}-${day}`
  }
