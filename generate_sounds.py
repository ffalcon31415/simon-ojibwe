import shutil

consonants = ['b','ch','d','g','j','k','m','n','p','s','sh','t','w','y','z','zh']
vowels = ['aa','ii','oo','e','a','i','o']

for vowel in vowels:
    for consonant in consonants:
        syllable = consonant + vowel
        if not syllable == "baa":
            shutil.copy(r"C:\Users\SONEJ\code\simon-ojibwe\sounds\baa.mp3", rf"C:\Users\SONEJ\code\simon-ojibwe\sounds\{syllable}.mp3")