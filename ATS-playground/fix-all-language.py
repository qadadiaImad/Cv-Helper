#!/usr/bin/env python3
"""Remove ALL language references from check files"""
import re
from pathlib import Path

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changed = False
    
    # Keep replacing until no more matches
    max_iterations = 20
    for _ in range(max_iterations):
        # Pattern for multiline ternary
        pattern = r"language\s*===\s*['\"]fr['\"]\s*\?\s*(['\"])((?:(?!\1).)*?)\1\s*:\s*(['\"])((?:(?!\3).)*?)\3"
        new_content = re.sub(pattern, r'"\4"', content, flags=re.DOTALL)
        
        if new_content == content:
            break
        content = new_content
        changed = True
    
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    checks_dir = Path(__file__).parent / 'lib' / 'checks'
    fixed = 0
    
    for ts_file in sorted(checks_dir.glob('*.ts')):
        if fix_file(ts_file):
            print(f"✓ Fixed {ts_file.name}")
            fixed += 1
        else:
            print(f"- {ts_file.name}")
    
    print(f"\n✨ Fixed {fixed} files")

if __name__ == '__main__':
    main()
