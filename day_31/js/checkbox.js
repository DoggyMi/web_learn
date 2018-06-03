const checkProduct = document.querySelectorAll("#product-check input");
const checkRegion = document.querySelectorAll("#region-check input");

let productSelectIndex = 0;
let regionSelectIndex = 0;

initCheckBox(Array.from(checkProduct));
initCheckBox(Array.from(checkRegion));

function initCheckBox(boxItems) {
    let allCheck = boxItems.pop();
    allCheck.addEventListener("change", function (ev) {
        for (let i = 0; i < boxItems.length; i++) {
            boxItems[i].checked = ev.target.checked;
        }
        filterData();
    });
    for (let i = 0; i < boxItems.length; i++) {
        boxItems[i].addEventListener("change", function () {
            let result = true;
            for (let j = 0; j < boxItems.length; j++) {
                result = boxItems[j].checked && result;
            }
            allCheck.checked = result;
            filterData()
        })
    }
}

function filterData() {
    let filterArr = [];
    let productArr = [];
    let regionArr = [];
    let productEle = Array.from(checkProduct);
    let regionEle = Array.from(checkRegion);
    for (let m = 0; m < productEle.length; m++) {
        if (productEle[m].checked) {
            productArr.push(productEle[m].value)
        }
    }
    for (let n = 0; n < regionEle.length; n++) {
        if (regionEle[n].checked) {
            regionArr.push(regionEle[n].value)
        }
    }
    for (let i = 0; i < sourceData.length; i++) {
        if ((productArr.indexOf(sourceData[i].product) !== -1) && (regionArr.indexOf(sourceData[i].region) !== -1)) {
            filterArr.push(sourceData[i])
        }
    }
    calSelectNum();
    createTable(filterArr)
}

function calSelectNum() {
    let productEle = Array.from(checkProduct);
    let regionEle = Array.from(checkRegion);
    productEle.pop();
    regionEle.pop();
    productSelectIndex = 0;
    regionSelectIndex = 0;
    for (let m = 0; m < productEle.length; m++) {
        if (productEle[m].checked) {
            productSelectIndex++;
        }
    }
    for (let n = 0; n < regionEle.length; n++) {
        if (regionEle[n].checked) {
            regionSelectIndex++;
        }
    }
}
