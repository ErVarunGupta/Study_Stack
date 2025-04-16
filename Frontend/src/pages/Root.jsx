function Root(){
    return(
        <div className="container root">
            <h1>Who are you?</h1>
            <button className="faculty-btn" onClick={() => window.location.href = '/faculty-login'}>Faculty</button>
            <button className="student-btn" onClick={() => window.location.href = '/student-login'}>Student</button>
        </div>
    )
}

export default Root;