import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";
import "../styles/heroCategories.css"
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const HeroCategories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/categories");
                console.log('Fetched categories:', response.data);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return ( 
        <div className='categories'>
                {categories.map(category => (
                    <a key={category.id} href={`/category/${category.categoryName}`} data-aos="fade-up">
                        <div style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover' }} className='categoryName'>
                        </div>
                        <h3 className='categoryName'> {category.categoryName} </h3>
                    </a>                        
                ))}
            </div>
    );
}
export default HeroCategories;