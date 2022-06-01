class books {
    constructor() {
        this.classNameActive = 'books-elements__btn_active';
        this.labelAdd = 'Взять из библиотеки';
        this.labelRemove = 'Отмена';
    }

    handleSetLocationStorage(element, id) {
        const { pushBook, books } = Storage.putBooks(id);

        if (pushBook) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
        }

    }

    render() {
        const booksStorage = Storage.getBooks();
        let htmlCatalog = '';

        COLLECTION.forEach(({ id, name, author, status, img }) => {
            let activeClass = '';
            let activeText = '';

            if (booksStorage.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' ' + this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
				<li class="books-elements">
					<span class="books-elements__name">${name}</span>
					<span class="books-elements__author">${author}</span>
					<img class="books-elements__img" src='${img}' />
					<span class="books-elements__status">${status}</span>
					<button class="books-elements__btn${activeClass}" onclick="booksPage.handleSetLocationStorage(this, '${id}');">${activeText}</button>
				</li>
			`;
        });
        const html = `
			<ul class="books-container">
				${htmlCatalog}
			</ul>
		`;

        rootBooks.innerHTML = html;
    }
}

const booksPage = new books();
booksPage.render();