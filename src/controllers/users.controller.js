import { getConnection, sql } from "../db.js";


// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .query("SELECT * FROM Users");

        res.json(result.recordset);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuarios"
        });
    }
};


// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT * FROM Users WHERE id = @id");

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(result.recordset[0]);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuario"
        });
    }
};


// Crear usuario
export const createUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const pool = await getConnection();

        await pool
            .request()
            .input("nombre", sql.VarChar, nombre)
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .query(`
                INSERT INTO Users (nombre, email, password)
                VALUES (@nombre, @email, @password)
            `);

        res.status(201).json({
            message: "Usuario creado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al crear usuario"
        });
    }
};


// Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const pool = await getConnection();

        await pool
            .request()
            .input("id", sql.Int, req.params.id)
            .input("nombre", sql.VarChar, nombre)
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .query(`
                UPDATE Users
                SET nombre = @nombre,
                    email = @email,
                    password = @password
                WHERE id = @id
            `);

        res.json({
            message: "Usuario actualizado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar usuario"
        });
    }
};


// Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const pool = await getConnection();

        await pool
            .request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE FROM Users WHERE id = @id");

        res.json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario"
        });
    }
};


// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .query(`
                SELECT id, nombre, email
                FROM Users
                WHERE email = @email
                AND password = @password
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            });
        }

        res.json({
            message: "Login correcto",
            user: result.recordset[0]
        });

    } catch (error) {
        res.status(500).json({
            message: "Error en el login"
        });
    }
};