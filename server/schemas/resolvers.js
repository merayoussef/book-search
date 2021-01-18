const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const bookSchema = require('../models/Book');

const resolvers = {
    Query: {
        getSingleUser: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('thoughts')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        createUser: async() => {
            return User.create()
                .select('-__v -password')
                .populate('thoughts')
                .populate('friends');
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        saveBook: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Book.findOneAndUpdate(params).sort({ createdAt: -1 });
        },
        deleteBook: async(parent, { _id }) => {
            return Book.findOne({ _id });
        }
    },

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addBook: async(parent, args, context) => {
            if (context.user) {
                const Book = await Book.create({...args, username: context.user.username });

                await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { book: book._id } }, { new: true });

                return book;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;