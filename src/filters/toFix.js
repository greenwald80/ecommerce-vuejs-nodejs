export default function toFix(value){
    value = parseFloat(value);//чтобы наверняка получить число из стринга
    return value.toFixed(2)+' ש"ח';//получить число с 2 знаками после запятой - 99,99
}