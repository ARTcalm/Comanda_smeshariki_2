import style from "./Greeting.module.css"
import {basename} from "../../consts"

export const Greeting = () => {
    
    return (
        <>
            <h1 className={style.title}>ЗДЕСЬ ВЫ НАЙДЕТЕ ЗАПЧАСТИ</h1>
            <div className={style.panels}>
                <div className={`${style.panel} ${style.left}`}>
                    <div className={style.block} >
                        <img src={`${basename}/img/QASHQAI.png`} />
                        <div className={style.popUp} >
                            <h1>NISSAN QASHQAI</h1>
                            <h2>ГОРОДСКОЙ АВАНТЮРИСТ</h2>
                            <p>КОМПАКТНЫЙ И МАНЕВРЕННЫЙ КРОССОВЕР, КОТОРЫЙ ИЗМЕНИЛ ПРЕДСТАВЛЕНИЕ О ГОРОДСКИХ АВТОМОБИЛЯХ.</p>
                        </div>
                    </div>
                    <div className={style.block} >
                        <img src={`${basename}/img/XTRAIL.png`}/>
                        <div className={style.popUp} >
                            <h1>NISSAN X-TRAIL</h1>
                            <h2>ТЕХНОЛОГИЧНЫЙ ПУТЕШЕСТВЕННИК</h2>
                            <p>ЭТАЛОННЫЙ СЕМЕЙНЫЙ КРОССОВЕР, ПРОШЕДШИЙ ПУТЬ ОТ УТИЛИТАРНОГО ВНЕДОРОЖНИКА ДО ВЫСОКОТЕХНОЛОГИЧНОГО АВТОМОБИЛЯ.</p>
                        </div>
                    </div>
                </div>
                <div className={`${style.panel} ${style.right}`}>
                    <div className={style.block} >
                        <img src={`${basename}/img/PATHFINDER.png`} />
                        <div className={style.popUp} >
                            <h1>NISSAN PATHFINDER</h1>
                            <h2>ВМЕСТИТЕЛЬНЫЙ ИССЛЕДОВАТЕЛЬ</h2>
                            <p>НАСТОЯЩИЙ АМЕРИКАНСКИЙ ПРОСТОР И УНИВЕРСАЛЬНОСТЬ ДЛЯ БОЛЬШОЙ СЕМЬИ.</p>
                        </div>
                    </div>
                    <div className={style.block} >
                        <img src={`${basename}/img/PATROL.png`}/>
                        <div className={style.popUp} >
                            <h1>NISSAN PATROL</h1>
                            <h2>ЛЕГЕНДАРНЫЙ ФЛАГМАН</h2>
                            <p>ЭТАЛОН НАДЕЖНОСТИ И РОСКОШИ В МИРЕ СЕРЬЕЗНЫХ ВНЕДОРОЖНИКОВ.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
{/* 
<img src={`${basename}/img/PATHFINDER.png`} />
<img src={`${basename}/img/PATROL.png`}/> */}