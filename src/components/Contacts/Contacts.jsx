import style from "./Contacts.module.css";


export const Contacts = () => {
    return(
        <div className={style.contactsBG}>
            <h1>Контакты</h1>
            <hr style={{width:"100%"}} />
            <div className={style.panels}>
                <div className={`${style.panel} ${style.left}`}>
                    <div className={style.contactInfo}>
                        <h1>Адрес</h1>
                        <hr style={{width:"100%"}} />
                        <p>г. Москва, ул. Электротехническая, д. 47, стр. 2, ТЦ «ТехноПарк», 1 этаж</p>
                    </div>
                    <div className={style.contactInfo}>
                        <h1>Если у вас есть вопросы</h1>
                        <hr style={{width:"100%"}} />
                        <p>Электронная почта: aplnmarket@gmail.com</p>
                        <p>Контактный телефон: +79826342801</p>
                    </div>
                </div>
                <div className={`${style.panel} ${style.right}`}>
                    <iframe 
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Aff528a4365eeab6652faffe6ef265ac67d582b5d90db29f5aa5d141a9e791404&amp;source=constructor"  
                    frameBorder={0}
                    >
                    </iframe>
                </div>
            </div>
        </div>
    )
}