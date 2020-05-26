export default function formattedPrice(value) {
    let parts = value.toString().split(".");//value приводим к строке и разбиваем на массив с точками
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");//получаем 5000 => 5.000
}