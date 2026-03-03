import React, { useState, useEffect, useRef } from 'react';
import style from "./SlideBar.module.css"


export const SlideBar = ({ 
    texts = ['ПОКУПАЙТЕ НОВЕЙШИЕ ДЕТАЛИ', 'СКИДКИ ДО 20%', 'ПРИВЕЗЕНЫ С ЯПОНИИ'],
    speed = 1,
    }) => {
    const [position, setPosition] = useState(0);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const animationRef = useRef(null);

    const fullText = texts.join(' • ');

    useEffect(() => {
        const animate = () => {
        setPosition(prev => {
            const content = contentRef.current;
            if (!content) return prev;
            
            const contentWidth = content.offsetWidth / 3; // половина, т.к. у нас дублированный контент
            const newPosition = prev - speed;
            
            // Сброс позиции для зацикливания
            if (Math.abs(newPosition) >= contentWidth) {
            return 0;
            }
            return newPosition;
        });
        
        animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        };
    }, [speed]);

    return (
        <div className={style.slidebar} ref={containerRef}>
            <div 
                className={style.sliderContent}
                style={{ transform: `translateX(${position}px)` }}
                ref={contentRef}
            >
                <span className={style.slideText}>{fullText}</span>
                <span className={style.slideText} >{fullText}</span>
                <span className={style.slideText} >{fullText}</span>
            </div>
        </div>
    );
};