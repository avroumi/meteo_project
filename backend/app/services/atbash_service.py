def transform_atbash(text: str, language: str):
    english = "abcdefghijklmnopqrstuvwxyz"
    hebrew = "אבגדהוזחטיכלמנסעפצקרשת"

    if language == "en":
        mapping = dict(zip(english, english[::-1]))
    else:
        mapping = dict(zip(hebrew, hebrew[::-1]))

    transformed = "".join(mapping.get(char.lower(), char) for char in text)

    return {"original": text, "transformed": transformed}
