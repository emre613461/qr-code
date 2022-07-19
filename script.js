const dataInput = document.querySelector("#data");

//Image Format
const imageFormat = document.querySelector('input[name="format"]:checked');

//Colors

const mainColorPicker = document.querySelector("#color");
const backgroundColorPicker = document.querySelector("#bg-color");

const mainColorValue = document.querySelector("#main-value");
const backColorValue = document.querySelector("#bg-value");
const updateColor = e => {
    const value = e.target.value;
    mainColorValue.innerHTML = e.target.value;
};
const updateBackgroundColor = e => {
    const value = e.target.value;
    backColorValue.innerHTML = e.target.value;
}
const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateColor);
    backgroundColorPicker.addEventListener('change', updateBackgroundColor)
};

addColorPickerEventListeners();

//Sliders

const sizeSlider = document.querySelector("#size");
const marginSlider = document.querySelector("#margin");

const sizeValue = document.querySelector("#size-value");
const marginValue = document.querySelector("#margin-value");

const updateSize = e => {
    const value = e.target.value
    sizeValue.innerHTML = `${value} * ${value}`
}
const updateMargin = e => {
    const value = e.target.value
    marginValue.innerHTML = `${value} px`
}
const addSliderEventListener = () => {
    sizeSlider.addEventListener("change", updateSize);
    marginSlider.addEventListener("change", updateMargin);
}
addSliderEventListener();


const submitButton = document.querySelector("#cta");

const showInputError = () => {
    dataInput.classList.add('error');
};

const addDataInputEventListener = () => {
    dataInput.addEventListener('change', e => {
        if (e.target.value !== "") {
            dataInput.classList.remove("error");
            submitButton.removeAttribute("disabled", true);
        } else {

            submitButton.setAttribute("disabled", true);

        }
    })
}
addDataInputEventListener();
const prepareParameters = params => {
    return {
        data: params.data,
        size: `${params.size} * ${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qZone,
        format: params.format,
    };
};
const settingsContainer = document.querySelector('#qr-code-settings');
const resultContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');
const displayQrCode = imgUrl => {
    settingsContainer.classList.add("flipped");
    resultContainer.classList.add("flipped");

    qrCodeImage.setAttribute("src", imgUrl);
}
const getQrCode = (parameters) => {
    const urlParams = new URLSearchParams(parameters).toString();
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/'

    const fullUrl = `${baseUrl}?${urlParams}`;
    fetch(fullUrl).then(response => {
        if (response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
};

const onSubmit = () => {
    console.log("clicked")

    const data = dataInput.value;
    // if (!data.lenght) {
    //     return showInputError();
    // }
    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const size = sizeSlider.value;
    const qZone = marginSlider.value;
    const format = imageFormat.value;
    const parameters = prepareParameters({
        data,
        color,
        bgColor,
        size,
        qZone,
        format
    });
    getQrCode(parameters)
};

const addSubmitEventListener = () => {
    submitButton.addEventListener("click", onSubmit);
}

addSubmitEventListener();