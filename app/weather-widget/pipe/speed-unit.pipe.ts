import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch (unitType) {
            case "mph": const miles = speed / 1.6;
                return Math.round(miles) + " mph";
            default:
                return Math.round(speed) + " km/h"
        }
    }
}