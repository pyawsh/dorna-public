import jalaliMoment from 'jalali-moment'
export const convertToPersianDate = (data: string) => {
    const gregorianDate = new Date(data)

    const jalaliDate = jalaliMoment(gregorianDate).format('jYYYY/jM/jD')

    return jalaliDate
}
