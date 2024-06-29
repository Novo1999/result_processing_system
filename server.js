const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

// Function to read data from db.json
const getData = () => {
  const data = fs.readFileSync('db.json')
  return JSON.parse(data)
}

// Endpoint to get student results
app.post('/get-results', (req, res) => {
  const { studentId, department, session, semester } = req.body
  const data = getData()

  const student = data.students.find(
    (s) =>
      s.studentId === studentId &&
      s.department === department &&
      s.session === session &&
      s.semester === semester
  )

  if (student) {
    res.json(student.results)
  } else {
    res.status(404).json({ error: 'Student not found' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
