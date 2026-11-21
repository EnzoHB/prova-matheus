import express from 'express'
import { pool } from './db.js'

const app = express()
app.use(express.json())
app.use(express.static('public'))

app.get('/produtos', async (req, res) => {
  const busca = req.query.busca || ''
  const [rows] = await pool.execute(
    'SELECT id, nome, preco, estoque FROM produto WHERE nome LIKE ? ORDER BY id',
    [`%${busca}%`],
  )
  res.json(rows)
})

app.get('/produtos/:id', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM produto WHERE id = ?', [req.params.id])
  if (rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' })
  res.json(rows[0])
})

app.post('/produtos', async (req, res) => {
  const { nome, preco, estoque } = req.body
  try {
    const [result] = await pool.execute(
      'INSERT INTO produto (nome, preco, estoque) VALUES (?, ?, ?)',
      [nome, preco, estoque || 0],
    )
    res.status(201).json({ id: result.insertId, nome, preco })
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Dados inválidos' })
  }
})

app.put('/produtos/:id', async (req, res) => {
  const { nome, preco, estoque } = req.body
  try {
    const [result] = await pool.execute(
      'UPDATE produto SET nome = ?, preco = ?, estoque = ? WHERE id = ?',
      [nome, preco, estoque, req.params.id],
    )
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Não encontrado' })
    res.json({ id: req.params.id, nome, preco, estoque })
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Dados inválidos' })
  }
})

app.delete('/produtos/:id', async (req, res) => {
  const [result] = await pool.execute('DELETE FROM produto WHERE id = ?', [req.params.id])
  if (result.affectedRows === 0) return res.status(404).json({ erro: 'Não encontrado' })
  res.status(204).end()
})

app.get('/categorias', async (req, res) => {
  const [rows] = await pool.execute('SELECT id, nome FROM categoria ORDER BY id')
  res.json(rows)
})

app.post('/categorias', async (req, res) => {
  const { nome } = req.body
  if (!nome) return res.status(400).json({ erro: 'Nome obrigatório' })
  try {
    const [result] = await pool.execute('INSERT INTO categoria (nome) VALUES (?)', [nome])
    res.status(201).json({ id: result.insertId, nome })
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Dados inválidos' })
  }
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ erro: 'Erro interno' })
})

app.listen(3000, () => console.log('Servidor em http://localhost:3000'))
