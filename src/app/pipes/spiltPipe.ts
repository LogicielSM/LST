import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spilt'
})

export class SpiltByPipe implements PipeTransform
{
	/**
	 * Transform
	 */
	public transform(value) {
        return value.replace('_', ' ');
    }
}
