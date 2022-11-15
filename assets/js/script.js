const menus = [
    {
        "name": "baju_kaos",
        "label_name": "Baju Kaos",
        "harga": 10000,
    },
    {
        "name": "baju_kameja",
        "label_name": "Baju Kameja",
        "harga": 20000,
    },
    {
        "name": "celana",
        "label_name": "Celana",
        "harga": 15000,
    },
    {
        "name": "karpet",
        "label_name": "Karpet",
        "harga": 30000,
    },
    {
        "name": "selimut",
        "label_name": "Selimut",
        "harga": 25000,
    },
    {
        "name": "gorden",
        "label_name": "Gorden",
        "harga": 20000,
    },
]

menus.forEach(v => {
    document.getElementById("input-menu").innerHTML += `<option value="${v.name}">${v.label_name}</option>`
});

let [dataBarang, listBarang, elGrandTotal, grandTotal] = [
    [],
    document.getElementById("list-barang"),
    document.getElementById("grandtotal"),
    0
]

const uniqBarang = () => {
    return dataBarang.length > 0 ? dataBarang.map((v) => v[1]) : []
}

const calculateGrandTotal = () => {
    grandTotal = 0
    dataBarang.forEach(element => {
        grandTotal += element[4]
    })
    elGrandTotal.innerHTML = `Rp ${grandTotal}`
}

const showBarang = () => {
    listBarang.innerHTML = ""

    dataBarang.forEach((element, i) => {
        listBarang.innerHTML += `<div class="card mb-2" id="card-${element[1]}">
                <div class="card-body">
                    <input type="hidden" id="d-input-${i}" value="${element[1]}">
                    <div class="row pl-3 pr-3">
                        <div class="w-50">
                            <h6 class="f-bold mb-0">${element[0]}</h6>
                            <h6>Rp ${element[2]}</h6 >
                            <div class="input-group input-group-sm pill-num">
                            <div class="input-group-prepend" onclick="editMenu(${i}, 'min')">
                                <span class="input-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                    </svg>
                                </span>
                            </div>
                            <input type="number" class="form-num" value="${element[3]}" id="input-num-${i}" oninput="editMenu(${i})">
                            <div class="input-group-prepend" onclick="editMenu(${i}, 'plus')">
                                <span class="input-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg></span>
                                </div>
                            </div>
                        </div>
                        <div class="w-50">
                            <div class="text-right">
                                <h6 class="mb-0">Subtotal</h6>
                                <h6 class="mb-3">Rp ${element[4]}</h6>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onclick="deleteBarang(${i})">
                                <path fill="#555" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                <path fill="#555" fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        `
    });

    calculateGrandTotal()
}

const addBarang = () => {
    let menu = document.getElementById('input-menu').value;
    let jumlah = document.getElementById('input-jumlah').value;
    let daftarMenu = getMenu(menu);
    let total = jumlah * daftarMenu.harga
    if (!uniqBarang().includes(daftarMenu.name) && daftarMenu.name) {
        dataBarang.push([
            daftarMenu.label_name,
            daftarMenu.name,
            daftarMenu.harga,
            jumlah,
            total,
        ])
        showBarang()
        return;
    } else if (uniqBarang().includes(daftarMenu.name)) {
        return;
    }
}

const getMenu = (input) => {
    const query = input.toLowerCase()
    let result
    menus.forEach(element => {
        let matching = element.name.toLowerCase().match(query)
        if (matching) {
            if (matching.input == input.toLowerCase()) result = element
        }
    })
    return result
}

const editMenu = (id, opsi = null) => {
    let inputNum = document.getElementById(`input-num-${id}`);
    let menu = document.getElementById(`d-input-${id}`).value;
    let daftarMenu = getMenu(menu);
    if (Number(inputNum.value) < 1) inputNum.value = 1
    if (opsi == 'plus') inputNum.value = Number(inputNum.value) + 1
    if (opsi == 'min') {
        inputNum.value = Number(inputNum.value) == 1
            ? 1
            : Number(inputNum.value) - 1
    }
    let total = daftarMenu.harga * Number(inputNum.value)
    dataBarang[id] = [
        dataBarang[id][0],
        dataBarang[id][1],
        dataBarang[id][2],
        Number(inputNum.value),
        total,
    ]

    showBarang()
}

const deleteBarang = (id) => {
    dataBarang.splice(id, 1)

    showBarang()
}

showBarang()
