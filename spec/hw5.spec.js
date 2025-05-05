const request = require("supertest");
const assert = require("assert");
const app = require("../lib/hw5");

describe("POST", () => {
    it("respond to text/plain prompt, accept and return (1)", (done) => {
        const messageData = "Test message";

        request(app)
           .post("/")
           .send(messageData)
           .set("Content-Type", "text/plain")
           .expect("Content-Type", /text/)
           .expect(200)
           .end((err, res) => {
             if(err) return done.fail(err);
             console.debug(res.body.received);
             expect(res.body.received).toBe(messageData.message);
             done();
           })
    });
});

describe("POST", () => {
    it("respond to application/json prompt, fail and return error (2)", (done) => {
        const messageData = "Test message";
        const error = "Bad Request: Invalid JSON format"

        request(app)
           .post("/")
           .send(messageData)
           .set("Content-Type", "application/json")
           .expect("Content-Type", /text/)
           .expect(400)
           .end((err, res) => {
             if(err) return done.fail(err);
             expect(res.text).toBeDefined();
             expect(res.text).toBe(error);
             done();
           })
    });
});

describe("POST", () => {
    it("respond to application/json prompt, accept and return JSON data (3)", (done) => {
        const jsonData = {key: "value"};

        request(app)
           .post("/")
           .send(JSON.stringify(jsonData))
           .set("Content-Type", "application/json")
           .expect("Content-Type", /json/)
           .expect(200)
           .end((err, res) => {
             if(err) return done.fail(err);
             expect(res.body).toBeDefined();
             expect(res.body.key).toBe("value");
             done();
           })
    });
});

describe("POST", () => {
    it("respond to text/plain prompt, accept and return plain text (4)", (done) => {
        const plainTextData = "Test plain text";

        request(app)
           .post("/")
           .send(plainTextData)
           .set("Content-Type", "text/plain")
           .expect("Content-Type", /text/)
           .expect(200)
           .end((err, res) => {
             if(err) return done.fail(err);
             expect(res.text).toBeDefined();
             expect(res.text).toBe(plainTextData);
             done();
           });
    });
});

describe("POST", () => {
    it("respond to application/json prompt, accept and return another JSON data (5)", (done) => {
        const jsonData = { name: "John", age: 25 };

        request(app)
           .post("/")
           .send(JSON.stringify(jsonData))
           .set("Content-Type", "application/json")
           .expect("Content-Type", /json/)
           .expect(200)
           .end((err, res) => {
             if(err) return done.fail(err);
             expect(res.body).toBeDefined();
             expect(res.body.name).toBe("John");
             expect(res.body.age).toBe(25);
             done();
           });
    });
});

describe("POST", () => {
    it("respond to application/x-www-form-urlencoded prompt, accept and return decoded form data (6)", (done) => {
        const formData = { username: "john_doe", password: "secretpassword" };
        const expectedResponse = "username=john_doe&password=secretpassword";

        request(app)
           .post("/")
           .send(formData)
           .set("Content-Type", "application/x-www-form-urlencoded")
           .expect("Content-Type", /x-www-form-urlencoded/)
           .expect(200)
           .end((err, res) => {
             if(err) return done.fail(err);
             expect(res.text).toBeDefined();
             expect(res.text).toBe(expectedResponse);
             done();
           });
    });
});

describe("POST", () => {
    it("respond to unsupported content type with a list of acceptable content types (7)", (done) => {
        const invalidContentType = "application/pdf";

        request(app)
           .post("/")
           .set("Content-Type", invalidContentType)
           .expect("Content-Type", /text/)
           .expect(415)
           .end((err, res) => {
             if(err) return done.fail(err);
             expect(res.text).toContain("Content type is not supported");
             expect(res.text).toContain("text/plain");
             expect(res.text).toContain("application/json");
             expect(res.text).toContain("application/x-www-form-urlencoded");
             done();
           });
    });
});

describe("POST", () => {
    it("respond to application/xml prompt, return error for unsupported content type (8)", (done) => {
        const xmlData = "<root><element>Test XML</element></root>";

        request(app)
            .post("/")
            .send(xmlData)
            .set("Content-Type", "application/xml")
            .expect("Content-Type", /text/)
            .expect(415)
            .end((err, res) => {
                if (err) return done.fail(err);
                expect(res.text).toContain("Content type is not supported");
                expect(res.text).toContain("text/plain");
                expect(res.text).toContain("application/json");
                expect(res.text).toContain("application/x-www-form-urlencoded");
                done();
            });
    });
});

describe("POST", () => {
    it("respond to image/jpeg prompt, return error for unsupported content type (9)", (done) => {
        const jpegData = "jpegData"; 

        request(app)
            .post("/")
            .send(jpegData)
            .set("Content-Type", "image/jpeg")
            .expect("Content-Type", /text/)
            .expect(415)
            .end((err, res) => {
                if (err) return done.fail(err);
                expect(res.text).toContain("Content type is not supported");
                expect(res.text).toContain("text/plain");
                expect(res.text).toContain("application/json");
                expect(res.text).toContain("application/x-www-form-urlencoded");
                done();
            });
    });
});

describe("POST", () => {
    it("respond to application/pdf prompt, return error for unsupported content type (10)", (done) => {
        const pdfData = "pdfData"; 

        request(app)
            .post("/")
            .send(pdfData)
            .set("Content-Type", "application/pdf")
            .expect("Content-Type", /text/)
            .expect(415)
            .end((err, res) => {
                if (err) return done.fail(err);
                expect(res.text).toContain("Content type is not supported");
                expect(res.text).toContain("text/plain");
                expect(res.text).toContain("application/json");
                expect(res.text).toContain("application/x-www-form-urlencoded");
                done();
            });
    });
});

describe("POST", () => {
    it("respond to unknown content type prompt, return error for unsupported content type (11)", (done) => {
        const unknownData = "unknownData"; 

        request(app)
            .post("/")
            .send(unknownData)
            .set("Content-Type", "application/unknown")
            .expect("Content-Type", /text/)
            .expect(415)
            .end((err, res) => {
                if (err) return done.fail(err);
                expect(res.text).toContain("Content type is not supported");
                expect(res.text).toContain("text/plain");
                expect(res.text).toContain("application/json");
                expect(res.text).toContain("application/x-www-form-urlencoded");
                done();
            });
    });
});

describe("POST", () => {
    it("respond to text/plain prompt, accept and return plain text (12)", (done) => {
        const plainTextData = "Test plain text";

        request(app)
            .post("/")
            .send(plainTextData)
            .set("Content-Type", "text/plain")
            .expect("Content-Type", /text/)
            .expect(200)
            .end((err, res) => {
                if (err) return done.fail(err);
                expect(res.text).toBeDefined();
                expect(res.text).toBe(plainTextData);
                done();
            });
    });
});

describe("POST", () => {
    it("respond to application/json prompt, accept and return JSON data (13)", (done) => {
        const jsonData = { key: "value", name: "John", age: 25  };

        request(app)
            .post("/")
            .send(JSON.stringify(jsonData))
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done.fail(err);
                expect(res.body).toBeDefined();
                expect(res.body.key).toBe("value");
                done();
            });
    });
});

describe("POST", () => {
    it("respond to application/x-www-form-urlencoded prompt, accept and return decoded form data (14)", (done) => {
        const formData = { username: "john_doe", password: "secretpassword", hello: "bob" };
        const expectedResponse = "username=john_doe&password=secretpassword&hello=bob";

        request(app)
            .post("/")
            .send(formData)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .expect("Content-Type", /x-www-form-urlencoded/)
            .expect(200)
            .end((err, res) => {
                if (err) return done.fail(err);
                expect(res.text).toBeDefined();
                expect(res.text).toBe(expectedResponse);
                done();
            });
    });
});
