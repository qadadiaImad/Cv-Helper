#!/usr/bin/env python3
"""Fix all language references in check files"""
import re
import os
from pathlib import Path

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Pattern 1: Simple ternary on one line
    # language === 'fr' ? "French" : "English"
    pattern1 = r"language\s*===\s*['\"]fr['\"]\s*\?\s*['\"]([^'\"]*?)['\"]\s*:\s*['\"]([^'\"]*?)['\"]"
    content = re.sub(pattern1, r'"\2"', content)
    
    # Pattern 2: Multiline ternary
    pattern2 = r"language\s*===\s*['\"]fr['\"]\s*\?\s*(['\"])([^\1]*?)\1\s*:\s*(['\"])([^\3]*?)\3"
    content = re.sub(pattern2, r'"\4"', content, flags=re.DOTALL)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    checks_dir = Path(__file__).parent / 'lib' / 'checks'
    fixed = 0
    
    for ts_file in checks_dir.glob('*.ts'):
        if fix_file(ts_file):
            print(f"✓ Fixed {ts_file.name}")
            fixed += 1
        else:
            print(f"- {ts_file.name} (no changes)")
    
    print(f"\n✨ Fixed {fixed} files")

if __name__ == '__main__':
    main()
