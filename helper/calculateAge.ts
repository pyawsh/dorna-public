export const calculateAge = (birthdate: string | undefined): number | null => {
    if (birthdate === undefined) {
        return null // اگر birthdate undefined باشد، مقدار null برگردانید
    }

    // تبدیل تاریخ تولد به آبجکت Date
    const birthDate = new Date(birthdate)

    // چک کردن اگر تاریخ تولد نامعتبر باشد
    if (isNaN(birthDate.getTime())) {
        return null // تاریخ تولد نامعتبر است
    }

    // تاریخ فعلی را بگیرید
    const currentDate = new Date()

    // محاسبه تفاوت سال‌ها
    const age = currentDate.getFullYear() - birthDate.getFullYear()

    // بررسی اینکه آیا تاریخ تولد در تاریخ فعلی گذشته است یا نه
    const isBirthdayPassed =
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() >= birthDate.getDate())

    // اگر تاریخ تولد گذشته باشد، یک سال اضافی نمایش دهید
    if (!isBirthdayPassed) {
        return age - 1
    }

    return age
}
