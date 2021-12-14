class Modal {
    constructor(modal, name, description) {
        this.modal = modal;
        document.querySelector('.modal-title').textContent = name;
        document.querySelector('.modal-body h1').textContent = description;
        this.closeModal = modal.querySelectorAll('[data-close]');
        this.closeModal.forEach(item => {
            item.addEventListener("click", (e) => {
                this.close();
            });
        });
    }

    open() {
        this.modal.isOpen = true;
        this.modal.classList.add('show-modal');
        setTimeout(() => {
            this.animateIn();
        }, 10);
    }
    close() {
        this.modal.isOpen = false;
        this.animateOut();
        setTimeout(() => {
            this.modal.classList.remove('show-modal');
        }, 250);
    }
    show() {

        if (this.modal.isOpen) {
            return this.close();
        }
        return this.open();

    }
    animateIn() {
        this.modal.classList.add('animate-modal');
    }
    animateOut() {
        this.modal.classList.remove('animate-modal');
    }
}