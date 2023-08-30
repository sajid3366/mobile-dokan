const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');

    }   
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    
    

    phones.forEach(phone => {
        console.log(phone);
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
    console.log(data);


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
    if(isLoading){
        loadingSpinner.classList.remove('hidden');

    }
    else{
        loadingSpinner.classList.add('hidden');

    }
}

const showAllBtn = () => {
    handleSearch(true);

}


// loadPhone();