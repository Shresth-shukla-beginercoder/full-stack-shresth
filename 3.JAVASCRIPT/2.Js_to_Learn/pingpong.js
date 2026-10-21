const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const btn1 = document.querySelector('#bp1');
const btn2 = document.querySelector('#bp2');
const rst = document.querySelector('#rst');
const sclt = document.querySelector('#chance');
let times = 0;
let times2 = 0;

btn1.addEventListener('click', () => {
    const sv = Number(sclt.value);
    times++;
    p1.textContent = times;
    if (times === sv) {
        p1.style.color = 'green';
        btn1.disabled = true;
        btn1.textContent = 'Disabled';

        p2.style.color = 'red';
        btn2.disabled = true;
        btn2.textContent = 'Disabled';
    }
});

btn2.addEventListener('click', () => {
    const sv = Number(sclt.value);
    times2++;
    p2.textContent = times2;
    if (times2 === sv) {
        p2.style.color = 'green';
        btn2.disabled = true;
        btn2.textContent = 'Disabled';

        p1.style.color = 'red';
        btn1.disabled = true;
        btn1.textContent = 'Disabled';
    }
});

rst.addEventListener('click', () => {
    times = 0;
    times2 = 0;
    p1.textContent = 0;
    p2.textContent = 0;
    p1.style.color = 'black';
    p2.style.color = 'black';
    btn1.disabled = false;
    btn2.disabled = false;
    btn1.textContent = '+1 player 1';
    btn2.textContent = '+1 player 2';
});