// datepicker persian
$('.date-field').persianDatepicker({
    observer: true,
    format: 'YYYY/MM/DD',
    altField: '.observer-example-alt',
    initialValue: false,
    autoClose: true,
    navigator:{
        scroll:false,
        text:{
            btnNextText:'',
            btnPrevText:''
        }
    },
});