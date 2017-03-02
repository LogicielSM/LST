import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})

export class SearchByPipe implements PipeTransform
{
    /**
     * Transform
     */
    public transform(value, key: string, term: string) {
        return value.filter((item) => {
            if (item.hasOwnProperty(key)) {
                if (term) {
                    let regExp = new RegExp('\\b' + term, 'gi');
                    return regExp.test(item[key]);
                }else {
                    return true;
                }
            }else {
                return false;
            }
        });
    }
}
