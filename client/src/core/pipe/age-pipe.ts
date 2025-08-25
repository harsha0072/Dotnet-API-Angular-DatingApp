import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    console.log(value)
    const today = new Date();
    const dob = new Date(value)

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff == 0 && today.getDate() < dob.getDate())) {
      age--
    }
    console.log(age);
    return age
  }

}
