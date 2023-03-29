const listDocs = document.querySelector('.table-content tbody');

const renderData = (data) => {
    console.log(data)
    data.forEach((el, i) => {
        listDocs.insertAdjacentHTML('beforeend',`
            <tr>
                <td class="border-b-2 border-gray-200">${i+1}</td>
                <td class="border-b-2 border-gray-200">${el.name}</td>
                <td class="border-b-2 border-gray-200">${el.data}</td>
                <td class="border-b-2 border-gray-200">${el.size}</td>
                <td class="border-b-2 border-gray-200">${el.author}</td>
                <td class="border-b-2 border-gray-200">${el.includeImg ? 'Да':'Нет'}</td>
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