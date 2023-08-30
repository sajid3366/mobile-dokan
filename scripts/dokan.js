const loadPhone = async (searchText ='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');

    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }




    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick="showDetailBtn('${phone.slug}')" class="btn btn-primary">Show Detail</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    toggleSpinner(false);

}

const showDetailBtn = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showModal(phone);

}

const showModal = (phone) => {
    console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.classList = ``
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="">
        <h3 class="text-xl font-semibold mt-2 mb-2">Model: ${phone.name}</h3>
        <p><span class="font-semibold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
        <p><span class="font-semibold">Memory: </span>${phone.mainFeatures.memory}</p>
        <p><span class="font-semibold">Sensors: </span>${phone.mainFeatures.sensors}</p>
        <p><span class="font-semibold">Storage: </span>${phone.mainFeatures.storage}</p>

    
    `
    show_detail_modal.showModal();

}


// for search btn

const handleSearch = (isShowAll) => {
    toggleSpinner(true);
    // console.log('hello vai');
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // console.log(searchFieldText);
    loadPhone(searchFieldText, isShowAll);

}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');

    }
    else {
        loadingSpinner.classList.add('hidden');

    }
}

const showAllBtn = () => {
    handleSearch(true);

}



loadPhone();