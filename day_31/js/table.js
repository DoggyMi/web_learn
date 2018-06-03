const tableWrapper = document.querySelector("#table-wrapper");

function createTable(data) {
    //整理数据
    if (productSelectIndex > regionSelectIndex) {
        data.sort(function (a, b) {
            return a.region.localeCompare(b.region)
        });
    }
    //清空表格
    tableWrapper.innerHTML = "";
    if (data.length <= 0) {
        return;
    }
    let table = document.createElement("table");
    //创建表头
    let tHead = createTr();
    let itemTd = createTd();
    itemTd.innerText = "商品";
    let regionTd = createTd();
    regionTd.innerText = "地区";
    if (productSelectIndex > regionSelectIndex) {
        tHead.appendChild(regionTd);
        tHead.appendChild(itemTd);
    } else {
        tHead.appendChild(itemTd);
        tHead.appendChild(regionTd);
    }
    for (let i = 1; i <= 12; i++) {
        let tempTd = createTd();
        tempTd.innerText = i.toString() + "月";
        tHead.appendChild(tempTd);
    }
    table.appendChild(tHead);
    //创建数据
    let lastData = "";

    for (let i = 0; i < data.length; i++) {
        let rowData = data[i];
        let tRow = createTr();

        let productTd = createTd();
        let regionTd = createTd();
        productTd.innerText = rowData.product;
        regionTd.innerText = rowData.region;

        if (productSelectIndex > regionSelectIndex) {
            regionTd.setAttribute("rowSpan", productSelectIndex);
            if (lastData !== rowData.region) {
                lastData = rowData.region;
                tRow.appendChild(regionTd);
            }
            tRow.appendChild(productTd);
        } else {
            productTd.setAttribute("rowSpan", regionSelectIndex);
            if (lastData !== rowData.product) {
                lastData = rowData.product;
                tRow.appendChild(productTd);
            }
            tRow.appendChild(regionTd);
        }

        for (let j = 0; j < data[i].sale.length; j++) {
            let tempTd = createTd();
            tempTd.innerText = data[i].sale[j];
            tRow.appendChild(tempTd);
        }

        table.appendChild(tRow);
    }
    tableWrapper.appendChild(table);
}

function createTd() {
    return document.createElement("td");
}

function createTh() {
    return document.createElement("th");
}

function createTr() {
    return document.createElement("tr");
}