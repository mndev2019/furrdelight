import React from 'react';

export const getTruncatedHtml = (html, wordLimit = 100) => {
    console.log(html)
    if (typeof window === 'undefined') return '';

    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    const words = text.split(/\s+/).slice(0, wordLimit).join(' ');
    return words + (words.length === text.length ? '' : '...');
};