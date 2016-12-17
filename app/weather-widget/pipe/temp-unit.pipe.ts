import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})

export class TempUnitPipe implements PipeTransform {
    transform(temp: number, unit: string) {
        if (unit == 'fahrenheit') { 
            return temp; 
        } else {
            const celsius = (temp - 32) * 5 / 9;
            return celsius;
        }
    }
}