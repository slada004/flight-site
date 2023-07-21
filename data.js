async function postData() {
    try {
        const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const seat = document.getElementById('qnt_1').value;
    const flyfrom = localStorage.getItem('flyfrom');
    const dest = localStorage.getItem('dest');
    const date = localStorage.getItem('depart');
    const bt = document.getElementById('btn');

    bt.textContent = 'Booking...';

    const url = 'https://flight-backend-0hdn.onrender.com/api/data';
    const data = {
        name,
        email,
        phone,
        address,
        seat,
        flyfrom,
        dest,
        date,
    };
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Mode': 'no-cors',
        },
    });

    // const dataRes = res.json();
    if (res.status !== 200) {
        return alert('Something went Wrong');
    } else if (res.status === 200) {
        bt.textContent = 'Book Now';
        return alert('Your flight has been succesfully booked. Please check your email for confirmation');
    }

    } catch (error) {
        console.log(error);
    }
};

async function getData() {
    const trackCode = document.getElementById('code').value;

    const data = {
        trackCode,
    }
    const url = 'https://flight-backend-0hdn.onrender.com/api/track-data';
    const req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Mode': 'no-cors',
        },
    });

    console.log(req);

    const res = await req.json();
    localStorage.setItem('data', JSON.stringify(res.data));
    document.location = '/track.html';

    console.log(res);
};

async function fetchData() {
    const data = localStorage.getItem('data');
    const parseData = JSON.parse(data);

    document.getElementById('dest').textContent = parseData.dest;
    document.getElementById('flyfrom').textContent = parseData.flyfrom;
    document.getElementById('track-code').textContent = parseData.trackCode;
    document.getElementById('name').textContent = parseData.name;
    document.getElementById('depart').textContent = `${parseData.date} 12:00 AM`;

    if (parseData.status === false) {
        document.getElementById('status').textContent = 'Processing...';   
    } else if (parseData.status === true) {
        document.getElementById('status').textContent = 'Approved';
    }

    if (parseData.mode === false) {
        document.getElementById('mode').textContent = 'Unpaid';   
    } else if (parseData.mode === true) {
        document.getElementById('mode').textContent = 'Paid';
    }
}

function display() {
    const check = localStorage.getItem('flyfrom');

    if (check !== null) {
        document.getElementById('top-flight').style.display = 'block';
    }

    return;
};

async function edit() {
    const bt = document.getElementById('btn');
    let mode;
    let status

    if (document.getElementById('mode').value === 'true') {
        mode = true;
    } else {
        mode = false;
    }

    if (document.getElementById('flyingFrom').value === 'true') {
        status = true;
    } else {
        status = false;
    }

    const check = document.getElementById('checkbox');
    console.log(check.checked);

    bt.textContent = 'Updating...'
    const url = 'https://flight-backend-0hdn.onrender.com/api/edit';
    const data = {
        trackCode: document.getElementById('track-code').value,
        mode,
        status,
        check: check.checked,
    }

    try {
        console.log(data.trackCode)

        if (data.trackCode === '') {
            alert('The list of Available countries has been updated. Please refresh the page for it to take effect');
        };
        const req = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Mode': 'no-cors',
            },
        });

    
        if (req.status !== 200) {
            bt.textContent = 'Update';
            return alert('Something Went Wrong')
        } else if (req.status === 200) {
            bt.textContent = 'Update';
            return alert('Updated');
        }
    } catch (error) {
        bt.textContent = 'Update';
        console.log(error);
    }
}

async function country() {
    const url = 'https://flight-backend-0hdn.onrender.com/api/country';

    const req = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Mode': 'no-cors',
        },
    });

    const res = await req.json();
    console.log(res);

    localStorage.setItem('countStatus', res.msg.status);
};

display();
country();
