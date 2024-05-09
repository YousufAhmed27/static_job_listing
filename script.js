import data from "./data.json" with {type: 'json'}

function FormAll() {
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div"),
            img = document.createElement("img"),
            detail = document.createElement("div"),
            comp = document.createElement("div"),
            name = document.createElement("div"),
            neww = document.createElement("div"),
            featured = document.createElement("div"),
            title = document.createElement("div"),
            time = document.createElement("div"),
            filt = document.createElement("div")

        card.classList.add("card")

        img.src = data[i]["logo"]
        img.alt = "logo"
        card.append(img)

        detail.classList.add("detail")
        comp.classList.add("comp")
        name.classList.add("name")
        name.innerHTML = data[i]["company"]
        comp.append(name)
        if (data[i]["new"]) {
            neww.classList.add("new")
            neww.innerHTML = "NEW!"
            card.classList.add("new")
            comp.append(neww)
        }
        if (data[i]["featured"]) {
            featured.classList.add("featured")
            featured.innerHTML = "FEATURED"
            comp.append(featured)
        }
        title.classList.add("title")
        title.innerHTML = data[i]["position"]
        time.classList.add("time")
        for (let x = 0; x < 5; x++) {
            let spa = document.createElement("span")
            if (x % 2 === 0) {
                switch (x) {
                    case 0:
                        spa.innerHTML = data[i]["postedAt"]
                        break;
                    case 2:
                        spa.innerHTML = data[i]["contract"]
                        break;
                    case 4:
                        spa.innerHTML = data[i]["location"]
                        break;
                }
            }
            else { spa.append(document.createTextNode(".")) }
            time.append(spa)
        }
        detail.append(comp)
        detail.append(title)
        detail.append(time)

        filt.classList.add("filt")
        if (data[i]["role"].length > 0) {
            let d = document.createElement("div")
            d.classList.add("temp")
            d.innerHTML = data[i]["role"]
            filt.append(d)
        }
        if (data[i]["level"].length > 0) {
            let d = document.createElement("div")
            d.classList.add("temp")
            d.innerHTML = data[i]["level"]
            filt.append(d)
        }
        if (data[i]["languages"].length > 0) {
            for (let z = 0; z < data[i]["languages"].length; z++) {
                let d = document.createElement("div")
                d.classList.add("temp")
                d.innerHTML = data[i]["languages"][z]
                filt.append(d)
            }
        }
        if (data[i]["tools"].length > 0) {
            for (let z = 0; z < data[i]["tools"].length; z++) {
                let d = document.createElement("div")
                d.classList.add("temp")
                d.innerHTML = data[i]["tools"][z]
                filt.append(d)
            }
        }
        card.append(detail)
        card.append(filt)
        document.querySelector(".main").append(card)
    }
}

let filterNames = []
function Addevent() {
    let tem = document.querySelectorAll(".main .card .filt .temp")
    for (let t of tem) {
        t.addEventListener("click", function () {
            if (!filterNames.includes(t.innerHTML)) {
                let template = document.createElement("div"),
                    templa = document.createElement("div"),
                    close = document.createElement("div")
                close.classList.add("close")
                close.innerHTML = "X"
                close.addEventListener("click", function () {
                    close.parentElement.remove()
                    filterNames.splice(filterNames.indexOf(close.previousElementSibling.innerHTML), 1)
                    Filter()
                })
                templa.classList.add("templa")
                templa.innerHTML = t.innerHTML
                template.classList.add("template")
                template.append(templa)
                template.append(close)
                document.querySelector(".filter .cont").append(template)
                filterNames.push(t.innerHTML)
                Filter()
            }
        })
    }
}

FormAll()
Addevent()

document.querySelector(".clear").addEventListener("click", function () {
    filterNames.splice(0, filterNames.length)
    let del = document.querySelectorAll(".filter .cont .template")
    for (let d of del) { d.remove() }
    Filter()
})

function Filter() {
    document.querySelector(".main").remove()
    let main = document.createElement("div")
    main.classList.add("main")
    document.querySelector(".container").append(main)
    FormAll()
    Addevent()
    let template = document.querySelectorAll(".filter .cont .template"),
        card = document.querySelectorAll(".main .card .filt")
    for (let i = 0; i < card.length; i++) {
        for (let x = 0; x < template.length; x++) {
            if (!card[i].textContent.includes(template[x].firstChild.innerHTML)) {
                card[i].parentElement.remove()
            }

        }
    }
}