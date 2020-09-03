import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios'
import { saveAs } from 'file-saver';

export const userService = {
    login,
    logout,
    register,
    slogin,
    sregister,
    createTest,
    getTest,
    startTest,
    deleteTest,
    createQuestion,
    deleteQuestion,
    getTestByClass,
    submitScore,
    isOnline,
    getOnlineStudents,
    profileCard,
    teacherCard
};
//Teacher's login
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('https://mtseb-online-test-system.herokuapp.com/api/teachers/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

//Get online students
function getOnlineStudents() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch('https://mtseb-online-test-system.herokuapp.com/api/students/online', requestOptions)
        .then(handleResponse)
}

//Change the statues of the online
function isOnline(online) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`https://mtseb-online-test-system.herokuapp.com/api/students/${online}`, requestOptions)
        .then(handleResponse)
}



//Student's login
function slogin(classNo, roll, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classNo, roll, password })
    };

    return fetch('https://mtseb-online-test-system.herokuapp.com/api/students/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');

}


//Teacher's register
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('https://mtseb-online-test-system.herokuapp.com/api/teachers/register/teacher', requestOptions).then(handleResponse);
}

//Student's register
function sregister(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('https://mtseb-online-test-system.herokuapp.com/api/students/register/student', requestOptions).then(handleResponse);
}

//function get test for teacher by his id
function getTest(teacherId) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json','Accept': 'application/json' },
        // body: JSON.stringify({ subject, classNo })
    };
    return fetch(`https://mtseb-online-test-system.herokuapp.com/api/test/t/${teacherId}`, requestOptions).then(handleResponse)

}
//function get test for student by his classNo
function getTestByClass(classNo) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        // body: JSON.stringify({ subject, classNo })
    };
    return fetch(`https://mtseb-online-test-system.herokuapp.com/api/test/${classNo}`, requestOptions).then(handleResponse)

}

//Create test
function createTest(subject, classNo) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json','Accept': 'application/json' },
        body: JSON.stringify({ subject, classNo })
    };

    return fetch('https://mtseb-online-test-system.herokuapp.com/api/test', requestOptions).then(handleResponse)
}

//Delete test
function deleteTest(testId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`https://mtseb-online-test-system.herokuapp.com/api/test/${testId}`, requestOptions).then(handleResponse)
}
//Start Test
function startTest(classNo) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`https://mtseb-online-test-system.herokuapp.com/api/test/starttest/${classNo}`, requestOptions).then(handleResponse)
}

//Create Question
function createQuestion(question, img, options, correctAnswer, desc) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, img, options, correctAnswer, desc })
    };

    return fetch('https://mtseb-online-test-system.herokuapp.com/api/test/questions', requestOptions).then(handleResponse)
}

//Delete Question
function deleteQuestion(testId, queId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`https://mtseb-online-test-system.herokuapp.com/api/test/${testId}/${queId}`, requestOptions).then(handleResponse)
}


//Submit Score
function submitScore(testId, score, total) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, total })
    };

    return fetch(`https://mtseb-online-test-system.herokuapp.com/api/test/answer/${testId}`, requestOptions).then(handleResponse)
}

function profileCard(data) {
    return axios.post('https://mtseb-online-test-system.herokuapp.com/api/filedownload/studentcard', data)
        .then(() => axios.get('https://mtseb-online-test-system.herokuapp.com/api/filedownload/profilecard', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'PROFILE_CARD.pdf');
        })
        .catch(err => console.log(err))

}

function teacherCard(data) {
    return axios.post('https://mtseb-online-test-system.herokuapp.com/api/filedownload/teachercard', data)
        .then(() => axios.get('https://mtseb-online-test-system.herokuapp.com/api/filedownload/teachercard', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'TEACHER_CARD.pdf');
        })
        .catch(err => console.log(err))

}


function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text).json();
        if (!response.ok) {
            if (response.status === 401) {

                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = Object.values(data) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

