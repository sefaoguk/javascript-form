

function baslangic() {


    const informationItem = document.querySelector('.informationItem');
    const inputID = document.querySelector('.inputID');
    const inputAd = document.querySelector('.inputAd');
    const inputSoyad = document.querySelector('.inputSoyad');
    const inputTc = document.querySelector('.inputTc');
    const inputIDAdded = document.querySelector('.inputIDAdded');
    const inputAdAdded = document.querySelector('.inputAdAdded');
    const inputSoyadAdded = document.querySelector('.inputSoyadAdded');
    const inputTcAdded = document.querySelector('.inputTcAdded');
    const inputTelAdded = document.querySelector('.inputTelAdded');
    const inputTel = document.querySelector('.inputTel')
    const dataBase = document.querySelector('.dataBase');
    const personelList = document.querySelector('.personelList');
    const parentList = document.querySelector('.parentList');
    const inputDelete = document.querySelector('.inputDelete');
    let deleteAllButton = document.querySelector('.deleteAllButton')
    let deleteButton = document.querySelector('.deleteButton');
    let btnID = document.querySelector('.btnID');
    let btnDuzenle = document.querySelector('.btnDuzenle')
    let duzenle = document.querySelector('.duzenle')
    let sil = document.querySelectorAll('.sil')
    let btn = document.querySelector('.btn');
console.log(inputID)
    events();
    function events() {
        btnID.addEventListener('click', createID);
        btn.addEventListener('click', submitInformation);
        deleteButton.addEventListener('click', dataDelete);
        deleteAllButton.addEventListener('click', dataDeleteAll);
        duzenle.addEventListener('click', dataEditIcon);
        btnDuzenle.addEventListener('click', dataEdit);
        // sil.addEventListener('click', dataSil);
    }
    //miniData ve dataAdd eşzamanlı çalışması için gereken fonksiyon
    function submitInformation(e) {
        dataAdd();
        miniData();
        e.preventDefault();
    }
    //Girilen bilgilerin hatırlanması için sağda bulunan miniData
    function miniData() {
        // inputIDAdded.value = inputID.value;
        // inputAdAdded.value = inputAd.value;
        // inputSoyadAdded.value = inputSoyad.value;
        // inputTcAdded.value = inputTc.value;
        // inputTelAdded.value = inputTel.value;
    }
    //Random ID oluşturma
    function createID(e) {
        inputID.value = Math.floor(100000 + Math.random() * (10000000 - 100000));
        inputIDAdded.value = inputID.value;
        inputID.innerText = inputID.value;
        inputID.style.fontSize = '16px';
        inputID.style.fontWeight = 'bold';
        e.preventDefault();
    }
    //Data Ekleme
    function dataAdd(e) {
        let deleted = 0;
        if (inputID.value != '' && inputAd.value != '' && inputSoyad.value != '' && inputTc.value != '') {
            if (isNaN(inputAd.value) == true && isNaN(inputSoyad.value) == true && isNaN(inputTc.value) == false && isNaN(inputTel.value) == false && inputTc.value.length == 11) {

                inputAd.style.border = '2px solid transparent'
                inputSoyad.style.border = '2px solid transparent'
                inputTc.style.border = '2px solid transparent'

                const ul = document.createElement('ul');
                ul.className = 'parentList';
                const No = document.createElement('li');
                let dizi = [No, inputID, inputAd, inputSoyad, inputTc, inputTel, deleted];

                for (let i = 0; i < dizi.length; i++) {
                    No.value = 1;
                    const li = document.createElement('li');
                    li.className = 'data';
                    personelList.appendChild(ul);
                    ul.appendChild(li);
                    li.appendChild(document.createTextNode(dizi[i].value))
                    li.innerText = dizi[i].value;
                    dizi[i].value = '';
                    inputID.innerText = '*';

                    if (dizi[i] == deleted) {
                        li.className = 'dataIcon'
                        li.innerHTML = ' <i class="far fa-edit duzenle"></i><i class="far fa-trash-alt sil"></i>'
                    }
                }
            }
            else {
                let dizi = [inputAd, inputSoyad, inputTc, inputTel]
                switch (true) {
                    case isNaN(dizi[0].value) == false:
                        { alert('Adınızı yanlış girdiniz. Lütfen tekrar deneyiniz.'); inputAd.style.border = '2px solid red'; break; }
                    case isNaN(dizi[1].value) == false:
                        { alert('Soyadınızı yanlış girdiniz. Lütfen tekrar deneyiniz.'); inputSoyad.style.border = '2px solid red'; break; }
                    case isNaN(dizi[2].value) == false && 11 <= dizi[2].value.length <= 11:
                        { alert('TC\'nizi yanlış girdiniz. Lütfen 11 haneli şekilde tekrar deneyiniz.'); inputTc.style.border = '2px solid red'; break; }
                    case isNaN(dizi[3].value) == true:
                        { alert('Telefonunuzu yanlış girdiniz. Lütfen tekrar deneyiniz.'); inputTel.style.border = '2px solid red'; break; }
                    default: alert('\nLütfen değerleri doğru giriniz. \n\nNo : TC 11 haneli olmalıdır.')
                }
            }
        }
        else {
            alert('Lütfen Bilgileri eksiksiz doldurunuz.');
        }
        //Sıra No oluşturmak için 
        sirala();
    }
    //Data Temizleme ;
    function dataDelete() {
        let cycle = 0;
        let inputValue;
        inputValue = Number(inputDelete.value);
        if (inputValue == '') {
            alert('Lütfen bir sayı giriniz');
        }
        else {
            for (let i = 0; i < personelList.children.length; i++) {
                let removed = personelList.children[i];
                deletedNo = personelList.children[i].children[0].innerText;
                deletedID = personelList.children[i].children[1].innerText;
                deletedNo = Number(deletedNo);
                deletedID = Number(deletedID);
                if (inputValue == deletedNo || inputValue == deletedID) {
                    removed.remove();
                    inputDelete.value = '';
                }
            }
        }
        sirala();
    }
    //Tüm databasei temizleme
    function dataDeleteAll() {
        let areSure = prompt('Tüm veritabanını silmek istediğinize emin misiniz ?"EVET" yazınız.')
        if (areSure == 'EVET') {
            personelList.innerHTML = '';
        }
        else {
            alert('Veritabanı korundu! Silmek istiyorsanız Tekrar deneyiniz.')
        }
    }
    //Düzenlemek için, sekmeye atar
    function dataEditIcon() {
        dizi = [inputIDAdded, inputAdAdded, inputSoyadAdded, inputTcAdded, inputTelAdded]
        for (let i = 0; i < parentList.children.length; i++) {

            if (dizi[i] == inputIDAdded) {
                dizi[i].innerText = duzenle.parentElement.parentElement.children[i + 1].innerText;
            }
            dizi[i].value = duzenle.parentElement.parentElement.children[i + 1].innerText;
        }
    }
    function dataEdit(e) {
        inputID.value=inputIDAdded.value
        inputAd.value=inputAdAdded.value
        inputSoyad.value=inputSoyadAdded.value
        inputTel.value=inputTelAdded.value
        inputTc.value=inputTcAdded.value

        dataAdd();
    
        dizi = [inputIDAdded, inputAdAdded, inputSoyadAdded, inputTcAdded, inputTelAdded]
        for (let i = 0; i < parentList.children.length; i++) {
            dizi[i].value = ''
        }
   
        e.preventDefault();
    }
    function dataSil(e) {
     
            console.log(sil.parentElement.parentElement.innerHTML)
            sil.parentElement.parentElement.remove();
        
        e.preventDefault();
    }
    function sirala() {
        for (let i = 1; i < personelList.children.length; i++) {
            personelList.children[i].children[0].innerText = i + 1;
        }
    }
}
