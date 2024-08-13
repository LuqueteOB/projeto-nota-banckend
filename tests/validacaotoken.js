const jwt = require('jsonwebtoken')

const key = '3F2d1G4sX9vP7hZ6qR3sA1kL0mY8jB5n'

const tokenGerado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhczQ1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiODFkYzliZGI1MmQwNGRjMjAwMzZkYmQ4MzEzZWQwNTUiLCJleHAiOjE3MjMyNDIxMzUsImlhdCI6MTcyMzIzODUzNX0.aHbBzr9pvtAQ4sdQdVC8wR0TCLHSRRFjm36AUW5SNm0'

try {
    const check = jwt.verify(tokenGerado, key); 

    console.log(check);
} catch (JsonWebTokenError) {
    console.log("Token Invalido");
    
}