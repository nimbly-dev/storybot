from passlib.context import CryptContext

#GET THE ALGORITHM FOR HASHING
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#CLASS FOR HASH USING "bcrpyt"
class Hash():
    def bcrpyt(password: str):
        return password_context.hash(password)

    def verify(hashed_password, plain_password):
        return password_context.verify(plain_password, hashed_password)
