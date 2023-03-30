const listDocs = document.querySelector('.table-content tbody');

const renderData = (data) => {
    data.forEach((el, i) => {
        listDocs.insertAdjacentHTML('beforeend',`
            <tr class="cursor-pointer hover:bg-sky-100" data-id=${el.id}>
                <td class="rounded-3xl">${i+1}</td>
                <td class="rounded-3xl">${el.name}</td>
                <td class="rounded-3xl">${el.data}</td>
                <td class="rounded-3xl">${el.size}</td>
                <td class="rounded-3xl">${el.author}</td>
                <td class="rounded-3xl">${el.includeImg ? 'Да':'Нет'}</td>
            </tr>
        `);
    });
}

const getData = (url) => {
    fetch(url)
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Данные были получены с ошибкой!');
            }
        })
        .then((data) => {
            renderData(data);
        })
        .catch((error) => {
            console.error(error.message);
        });
};

getData('../database/dbase.json')