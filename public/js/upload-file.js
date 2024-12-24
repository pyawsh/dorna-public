const UPLOAD = {
    BASE_PATH: window.location.origin,
    ACCEPTED_DOC_MIMES: [
        'image/png',
        'image/jpeg',
        'video/mp4',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
    ],
    DOC_MIMES: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
    ],
    FileInputs: [...document.querySelectorAll("input[type='file']")],

    Init: () => {
        UPLOAD.AddEventListeners()
    },
    AddEventListeners: () => {
        UPLOAD.FileInputs.map((fileInput) => {
            fileInput.addEventListener('change', UPLOAD.HandleFileChange)
        })

        UPLOAD.FileInputs.map((fileInput) => {
            fileInput.addEventListener('blur', (e) => {})
        })

        UPLOAD.FileInputs.map((fileInput) => {
            const box = fileInput.closest('.uk-placeholder')
            if (box) {
                box.addEventListener(
                    'dragover',
                    (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        box.classList.add('uk-box-shadow-medium')
                    },
                    false
                )
            }
        })

        UPLOAD.FileInputs.map((fileInput) => {
            const box = fileInput.closest('.uk-placeholder')
            if (box) {
                box.addEventListener(
                    'dragleave',
                    (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        box.classList.remove('uk-box-shadow-medium')
                    },
                    false
                )
            }
        })
    },
    HandleFileChange: (e) => {
        let files
        let isMultiple = false

        if (e.target.hasAttribute('multiple')) {
            isMultiple = true
        }

        const dropZone = e.target.closest('.drop__zone')
        const componentContainer = dropZone.closest('.uk-upload-box')
        const documentCategory = dropZone.dataset.documentCategory
        let preview, alertBox, alertMsg
        preview = componentContainer.querySelector('.preview')
        // console.log(preview)
        alertBox = componentContainer.querySelector(`#error-alert`)
        alertMsg = componentContainer.querySelector(`#error-messages`)

        files = e.target.files
        const options = {
            files,
            fileInput: e.target,
            isMultiple,
            preview,
            alertBox,
            alertMsg,
            dropZone,
        }

        UPLOAD.PreviewMultipleDocs(options)
    },
    RemoveChild: (preview) => {
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild)
        }
    },
    ImgPreviewLi: (readerResult, filename, filesize) => {
        const div = document.createElement('div')
        div.className = 'col-12 mb-3 flex-grow-1'

        // console.log(readerResult)
        $(`<div class="file-prew w-100 d-flex align-items-center h-100 position-relative">
                <div class="img-preview-responsive magnific-img AZ-img-container">
                    <div class="AZ-img-container-inner AZ-img-cover">
                        <a class="image-popup-vertical-fit" href=${readerResult}>
                          <img src=${readerResult}  data-name=${filename} alt=${filename} />
                        </a>
                    </div>
                </div>

                    <div class="flex-grow-1">
                        <span class="uk-text-meta uk-text-break file-upload-name">${filename}</span>
                        <span class="file-upload-size">${filesize}</span>
                        <a href="" class="download-file mb-2 d-flex">دانلود</a>
                    </div>
                    <span class="date-file position-absolute">ب.ظ 01:13 - 22 شهریور 1401</span>
                </div>`).appendTo(div)
        // li.append(div, span, spansize);
        return div
    },
    PdfPreviewLi: (readerResult, filename, filesize) => {
        const div = document.createElement('div')
        div.className = 'col-12 mb-3'

        $(`<div class="file-prew w-100 d-flex align-items-center h-100 position-relative z">
                <div class="img-preview-responsive AZ-img-container">
                    <div class="AZ-img-container-inner AZ-img-cover">
						<span class="icon-document-download"></span>
                    </div>
                </div>
                    <div class="flex-grow-1">
                        <span class="uk-text-meta uk-text-break file-upload-name">${filename}</span>
                        <span class="file-upload-size">${filesize}</span>
                        <a href="" class="download-file mb-2 d-flex">دانلود</a>
                    </div>
                    <span class="date-file position-absolute">ب.ظ 01:13 - 22 شهریور 1401</span>
                </div>`).appendTo(div)

        return div
    },
    ValidateFileType: ({
        fileType,
        fileInput,
        alertBox,
        alertMsg,
        preview,
        dropZone,
    }) => {
        if (!UPLOAD.ACCEPTED_DOC_MIMES.includes(fileType)) {
            alertMsg.textContent = ' یک یا چند نوع فایل شما مجاز نیست.'
            alertMsg.classList.add('uk-text-danger')
            alertBox.classList.remove('uk-hidden')
            fileInput.value = ''
            UPLOAD.RemoveChild(preview)
            return false
        }
        return true
    },

    PreviewMultipleDocs: ({
        files,
        fileInput,
        preview,
        alertBox,
        alertMsg,
        dropZone,
    }) => {
        const docFiles = [...files]

        docFiles.forEach((file) => {
            const size = file['size']
            const fileType = file['type']

            if (docFiles.length !== 0) {
                UPLOAD.RemoveChild(preview)
            }

            const fileOptions = {
                fileInput,
                preview,
                alertBox,
                alertMsg,
                fileType,
                size,
                dropZone,
            }

            // if (!UPLOAD.ValidateFileSize(fileOptions)) return;

            if (!UPLOAD.ValidateFileType(fileOptions)) return

            alertMsg.textContent = ''
            alertBox.classList.add('uk-hidden')
            fileInput.files = files
            console.log(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                let filename = file['name']

                const convertBytes = function (filesize) {
                    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

                    if (filesize == 0) {
                        return 'n/a'
                    }

                    const i = parseInt(
                        Math.floor(Math.log(filesize) / Math.log(1024))
                    )

                    if (i == 0) {
                        return filesize + ' ' + sizes[i]
                    }

                    return (
                        (filesize / Math.pow(1024, i)).toFixed(1) +
                        ' ' +
                        sizes[i]
                    )
                }

                let imgPreview = ''
                if (UPLOAD.DOC_MIMES.includes(fileType)) {
                    if (fileType === 'application/pdf') {
                        imagePath = `${UPLOAD.BASE_PATH}/images/doc/pdf.svg`

                        imgPreview = UPLOAD.PdfPreviewLi(
                            imagePath,
                            filename,
                            convertBytes(file['size'])
                        )
                    } else {
                        imagePath = `${UPLOAD.BASE_PATH}/images/doc/docx.svg`
                        imgPreview = UPLOAD.ImgPreviewLi(imagePath, filename)
                    }
                } else {
                    imgPreview = UPLOAD.ImgPreviewLi(
                        reader.result,
                        filename,
                        convertBytes(file['size'])
                    )
                }
                preview.append(imgPreview)
            }
        })
    },
}

document.addEventListener('DOMContentLoaded', UPLOAD.Init())
