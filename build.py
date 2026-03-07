import re
import os

# Files to process
FILES = ['script.js', 'tutorial.js', 'styles.css']
SRC_DIR = 'src'
DIST_DIR = '.'

def minify_js(content):
    # Remove single line comments (//...)
    content = re.sub(r'//.*', '', content)
    # Remove multi-line comments (/* ... */)
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove empty lines and trim
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    return ' '.join(lines)

def minify_css(content):
    # Remove comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove whitespace around specific characters
    content = re.sub(r'\s*([:;{}])\s*', r'\1', content)
    # Remove whitespace
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    return ''.join(lines)

def process_file(filename):
    src_path = os.path.join(SRC_DIR, filename)
    dist_path = os.path.join(DIST_DIR, filename)
    
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found")
        return

    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"Processing {filename}...")
    
    if filename.endswith('.js'):
        minified = minify_js(content)
    elif filename.endswith('.css'):
        minified = minify_css(content)
    else:
        minified = content

    with open(dist_path, 'w', encoding='utf-8') as f:
        f.write(minified)
    
    print(f"  Saved {len(minified)} bytes to {dist_path}")

if __name__ == '__main__':
    for f in FILES:
        process_file(f)
