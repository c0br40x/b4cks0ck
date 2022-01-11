"""
Prototipo de el Malware:
"""

class Malware:
    def __init__(self):
        self.author = ["Alk4x", "Mr. Char"]
        self.version = 1.0
    def post(self):
        print(self.author, self.version)
        
"""
Run:
"""

if __name__ == "__main__":
    B4cks0ck = Malware()
    B4cks0ck.post()

