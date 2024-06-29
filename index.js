document
  .getElementById('resultForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    const studentId = document.getElementById('studentId').value
    const department = document.getElementById('department').value
    const session = document.getElementById('session').value
    const semester = document.getElementById('semester').value

    const getResultsBtn = document.querySelector('.get-results')

    getResultsBtn.innerText = 'Loading...'
    fetch('http://localhost:3000/get-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, department, session, semester }),
    })
      .then((response) => response.json())
      .then((results) => {
        getResultsBtn.innerText = 'Get Results'
        if (results.error) {
          document.getElementById(
            'results'
          ).innerHTML = `<p>${results.error}</p>`
        } else {
          getResultsBtn.innerText = 'Get Results'
          document.getElementById('results').innerHTML = `
                    <h3>Results for Student ID: ${studentId}</h3>
                    <p>Department: ${department}</p>
                    <p>Session: ${session}</p>
                    <p>Semester: ${semester}</p>
                    <ul>
                        <li>Assignment: ${results.assignment}</li>
                        <li>Class Test: ${results.classTest}</li>
                        <li>Midterm: ${results.midterm}</li>
                        <li>Final Exam: ${results.finalExam}</li>
                        <li>GPA: ${results.gpa}</li>
                        <li>CGPA: ${results.cgpa}</li>
                    </ul>
                `
        }
      })
      .catch((error) => {
        getResultsBtn.innerText = 'Get Results'
        console.error('Error:', error)
        document.getElementById(
          'results'
        ).innerHTML = `<p>There was an error fetching the results.</p>`
      })
  })
