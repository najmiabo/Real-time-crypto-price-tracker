const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User, Crypto, WatchList } = require("../models")

class Controller {
    static async register(req, res, next) {
        try {
            await User.create(req.body)
            res.status(201).json({ message: "Berhasil Register" })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: "empty_email" }
            }
            if (!password) {
                throw { name: "empty_password" }
            }

            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: "fail_login" }
            }

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                throw { name: "fail_login" }
            }

            const access_token = signToken({ id: user.id })
            res.json({ access_token })
        } catch (err) {
            next(err)
        }
    }

    static async addWatchList(req, res, next) {
        try {
            const { cryptoId } = req.params
            const crypto = await Crypto.findByPk(cryptoId)
            if (!crypto) {
                throw { name: "crypto_not_found" }
            }
            await WatchList.create({ UserId: req.user.id, CryptoId: crypto.id })
            res.status(201).json({ message: "Watch List successfully added" })
        } catch (err) {
            next(err)
        }
    }

    static async watchLists(req, res, next) {
        try {
            const watchLists = await WatchList.findAll({
                where: { UserId: req.user.id },
                include: Crypto
            })
            res.json(watchLists)
        } catch (err) {
            next(err)
        }
    }

    static async deleteWatchLists(req, res, next) {
        try {
            const { id } = req.params
            const watchList = await WatchList.findByPk(id)
            if (!watchList) {
                throw { name: "wl_not_found" }
            }
            await WatchList.destroy({ where: { id } })
            res.json({ message: "WL successfully deleted" })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller