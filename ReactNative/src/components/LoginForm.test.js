const rewire = require("rewire")
const LoginForm = rewire("./LoginForm")
const Login = LoginForm.__get__("Login")

const mapStateToProps = LoginForm.__get__("mapStateToProps")
// @ponicode
describe("onEmailChange", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Pierre Edouard", "Jean-Philippe", "Anas"], ["Michael", "Michael", "Michael"], ["Michael", "Jean-Philippe", "Anas"]]
        inst = new Login(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.onEmailChange("This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onEmailChange("foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onEmailChange("Hello, world!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.onEmailChange("Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.onEmailChange(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onPasswordChange", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Anas", "Michael"], ["Anas", "Pierre Edouard", "Michael"], ["Pierre Edouard", "Jean-Philippe", "George"]]
        inst = new Login(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.onPasswordChange("foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onPasswordChange("Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onPasswordChange("This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.onPasswordChange("Hello, world!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.onPasswordChange(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onButtonPress", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Anas", "Anas"], ["Jean-Philippe", "Michael", "Jean-Philippe"], ["Pierre Edouard", "George", "George"]]
        inst = new Login(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.onButtonPress()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ auth: {} })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ auth: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
