# E-Commerce
This basic e commerce website is designed as a simplified example using Angular for the frontend, Node.js for the backend, and MongoDB for the database. The project consists of two main parts: the frontend responsible for the user interface and interactions, and the backend handling data storage and retrieval.
Backend Folder Architecture 
```
└── 📁src
    └── 📁app
        └── 📁controllers
            └── 📁v1
                └── 📁auth
                    └── index.js
                    └── 📁user
                        └── routes.js
                        └── user.js
                └── routes.js
                └── 📁sales
                    └── index.js
                    └── 📁product
                        └── product.js
                        └── routes.js
        └── 📁helpers
            └── customResponse.js
            └── messages.js
            └── utility.js
        └── 📁middleware
            └── upload.js
        └── 📁mocks
            └── index.js
            └── superAdminUser.json
        └── 📁models
            └── 📁auth
                └── index.js
                └── 📁repository
                    └── userRepository.js
                └── userModel.js
            └── 📁sales
                └── index.js
                └── productModel.js
                └── 📁repository
                    └── productRepository.js
        └── routes.js
        └── 📁utilities
            └── memoryCacheHandler.js
            └── swaggerHandler.js
    └── 📁assets
        └── 📁productImages
            └── 1704077636037-bezkoder-download.jpg
    └── 📁configuration
        └── config.js
        └── expressJwt.js
        └── mongoose.js
    └── server.js
```
