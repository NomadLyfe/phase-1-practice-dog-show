document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(data => displayDogList(data));
    function displayDogList(dogsData) {
        for(const dog of dogsData) {
            const tbody = document.querySelector('#table-body');
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const btn = document.createElement('button');
            td1.textContent = dog.name;
            td2.textContent = dog.breed;
            td3.textContent = dog.sex;
            btn.textContent = 'Edit Dog';
            btn.id = dog.id;
            td4.appendChild(btn);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);
            btn.addEventListener('click', editDogBtn);
        }
    }
    let id = null;
    let form = null;
    function editDogBtn(e) {
        id = e.target.id;
        form = document.querySelector('#dog-form');
        form.name.value = e.target.parentNode.parentNode.children[0].textContent;
        form.breed.value = e.target.parentNode.parentNode.children[1].textContent;
        form.sex.value = e.target.parentNode.parentNode.children[2].textContent;
        form.addEventListener('submit', updatePage);
    }
    function updatePage(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'name': document.querySelector('#dog-form').name.value,
                'breed': document.querySelector('#dog-form').breed.value,
                'sex': document.querySelector('#dog-form').sex.value
            })
        })
            .then(resp => resp.json())
            .then(() => {
                document.querySelector('#table-body').innerHTML = '';
                fetch('http://localhost:3000/dogs')
                    .then(resp => resp.json())
                    .then(data => displayDogList(data));
                form.reset();
            });
    }
})