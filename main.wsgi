import os
import sys

#Add C:\GLOWUP to the system path
sys.path.append(r'C:\GLOWUP')

# Import your Flask application
from GLOWUP import app as application
application.secret_key = 'many random bytes'
